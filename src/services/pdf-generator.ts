import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, degrees } from "pdf-lib";
import { TicketConfig, PrintConfig } from "@/types";
import { formatTicketNumber, getDigitsNeeded, formatCurrency } from "@/lib/utils";
import { A4_WIDTH_PT, A4_HEIGHT_PT, MM_TO_PT } from "@/lib/constants";

interface PDFGeneratorOptions {
  ticketConfig: TicketConfig;
  printConfig: PrintConfig;
  onProgress?: (current: number, total: number) => void;
}

// Colores del ticket
const DARK_RED = rgb(0.6, 0.05, 0.05);
const BLACK = rgb(0.05, 0.05, 0.05);
const DARK_GRAY = rgb(0.3, 0.3, 0.3);
const MED_GRAY = rgb(0.5, 0.5, 0.5);
const LIGHT_GRAY = rgb(0.78, 0.78, 0.78);
const BORDER_COLOR = rgb(0.25, 0.25, 0.25);
const BG_STUB = rgb(0.97, 0.97, 0.97);

interface Fonts {
  font: PDFFont;
  fontBold: PDFFont;
  fontItalic: PDFFont;
  fontBoldItalic: PDFFont;
  courierBold: PDFFont;
}

// Genera el PDF completo con todos los tickets
export async function generateRifaPDF(options: PDFGeneratorOptions): Promise<Uint8Array> {
  const { ticketConfig, printConfig, onProgress } = options;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldItalic = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
  const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);
  const fonts: Fonts = { font, fontBold, fontItalic, fontBoldItalic, courierBold };
  const digits = getDigitsNeeded(ticketConfig.totalTickets, ticketConfig.startNumber);

  // Dimensiones en puntos
  const margin = printConfig.marginTop * MM_TO_PT;
  const gap = printConfig.gap * MM_TO_PT;
  const tW = printConfig.ticketWidth * MM_TO_PT;
  const tH = printConfig.ticketHeight * MM_TO_PT;
  const availW = A4_WIDTH_PT - margin * 2;
  const availH = A4_HEIGHT_PT - margin * 2;

  // Grilla de tickets horizontales
  const cols = Math.max(1, Math.floor((availW + gap) / (tW + gap)));
  const rows = Math.max(1, Math.floor((availH + gap) / (tH + gap)));
  const horizPerPage = cols * rows;
  const gridW = cols * tW + (cols - 1) * gap;

  // Tickets alineados a la izquierda para maximizar espacio derecho
  const gridStartX = margin;

  // Columna lateral derecha: tickets verticales (rotados 90°)
  const rightRem = A4_WIDTH_PT - gridStartX - gridW - gap - margin;
  const canFitSide = rightRem >= tH;
  // Cada ticket rotado: ancho en página = tH, alto en página = tW
  const sideCount = canFitSide ? Math.floor((availH + gap) / (tW + gap)) : 0;
  const totalPerPage = horizPerPage + sideCount;
  const totalPages = Math.ceil(ticketConfig.totalTickets / totalPerPage);

  let idx = 0;
  for (let p = 0; p < totalPages; p++) {
    const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);

    // Dibujar tickets horizontales
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (idx >= ticketConfig.totalTickets) break;
        const formatted = formatTicketNumber(ticketConfig.startNumber + idx, digits);
        const x = gridStartX + col * (tW + gap);
        const y = A4_HEIGHT_PT - margin - (row + 1) * tH - row * gap;
        drawTicket(page, x, y, tW, tH, formatted, ticketConfig, fonts);
        idx++;
      }
    }

    // Dibujar tickets verticales en el costado derecho (mismo ticket rotado 90°)
    if (canFitSide) {
      for (let i = 0; i < sideCount; i++) {
        if (idx >= ticketConfig.totalTickets) break;
        const formatted = formatTicketNumber(ticketConfig.startNumber + idx, digits);
        const rx = gridStartX + gridW + gap;
        const ry = A4_HEIGHT_PT - margin - (i + 1) * tW - i * gap;

        // Crear documento temporal con el ticket horizontal
        const tempDoc = await PDFDocument.create();
        const tFont = await tempDoc.embedFont(StandardFonts.Helvetica);
        const tFontBold = await tempDoc.embedFont(StandardFonts.HelveticaBold);
        const tFontItalic = await tempDoc.embedFont(StandardFonts.HelveticaOblique);
        const tFontBoldItalic = await tempDoc.embedFont(StandardFonts.HelveticaBoldOblique);
        const tCourierBold = await tempDoc.embedFont(StandardFonts.CourierBold);
        const tempFonts: Fonts = { font: tFont, fontBold: tFontBold, fontItalic: tFontItalic, fontBoldItalic: tFontBoldItalic, courierBold: tCourierBold };

        const tempPage = tempDoc.addPage([tW, tH]);
        drawTicket(tempPage, 0, 0, tW, tH, formatted, ticketConfig, tempFonts);

        // Incrustar la página temporal en el documento principal
        const [embeddedPage] = await pdfDoc.embedPages([tempPage]);

        // Dibujar rotado 90° en sentido horario
        // Ajuste: pegado al borde izquierdo de la columna lateral
        page.drawPage(embeddedPage, {
          x: rx,
          y: ry + tW,
          rotate: degrees(-90),
        });

        idx++;
      }
    }

    // Reportar progreso y ceder control al navegador para que la UI se actualice
    if (onProgress) {
      onProgress(Math.min(idx, ticketConfig.totalTickets), ticketConfig.totalTickets);
      // Ceder el hilo para que React pueda re-renderizar la barra de progreso
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  return pdfDoc.save();
}

// Dibuja un ticket horizontal completo (sección principal + talón)
function drawTicket(
  page: PDFPage, x: number, y: number, w: number, h: number,
  ticketNumber: string, config: TicketConfig, fonts: Fonts
) {
  const { font, fontBold, fontItalic, fontBoldItalic, courierBold } = fonts;
  // Factor de escala basado en la altura del ticket
  const s = h / 160;
  const TITLE_SIZE = Math.max(4, 9 * s);
  const SUBTITLE_SIZE = Math.max(3.5, 8 * s);
  const INFO_SIZE = Math.max(3, 5.5 * s);
  const PRIZE_HEADER_SIZE = Math.max(3, 6 * s);
  const PRIZE_SIZE = Math.max(2.8, 5 * s);
  const PRICE_SIZE = Math.max(4, 10 * s);
  const NUM_SIZE = Math.max(5, 13 * s);
  const STUB_TITLE_SIZE = Math.max(3, 7 * s);
  const STUB_LABEL_SIZE = Math.max(2.8, 6 * s);
  const STUB_INFO_SIZE = Math.max(2.5, 5.5 * s);
  const STUB_NUM_SIZE = Math.max(4, 11 * s);
  const STUB_VAL_SIZE = Math.max(2.8, 6 * s);

  // Sección principal (72%) y talón de control (28%)
  const mainW = w * 0.72;
  const stubW = w * 0.28;
  const stubX = x + mainW;
  const pad = 5 * s;

  // Fondos y bordes
  page.drawRectangle({ x, y, width: w, height: h, color: rgb(1, 1, 1) });
  page.drawRectangle({ x: stubX, y, width: stubW, height: h, color: BG_STUB });
  page.drawRectangle({ x, y, width: w, height: h, borderColor: BORDER_COLOR, borderWidth: 0.5 });
  // Línea punteada vertical separadora
  dashedLineV(page, stubX, y + 2, y + h - 2, 4, 3, 0.4, MED_GRAY);

  const cx = x + pad;
  const mainRight = stubX - pad;
  const mainContentW = mainRight - cx;
  const bottomY = y + pad;
  let cy = y + h - pad;

  // Encabezado del ticket
  cy -= TITLE_SIZE;
  page.drawText(config.eventName, { x: cx, y: cy, size: TITLE_SIZE, font: fontBold, color: BLACK });
  cy -= SUBTITLE_SIZE + 2 * s;
  page.drawText(config.subtitle, { x: cx, y: cy, size: SUBTITLE_SIZE, font: fontBoldItalic, color: DARK_RED });
  cy -= INFO_SIZE + 3 * s;
  page.drawText(`Sorteo: ${config.drawDate}`, { x: cx, y: cy, size: INFO_SIZE, font, color: DARK_GRAY });
  cy -= INFO_SIZE + 1.5 * s;
  const contText = `Contribución: ${config.contributionText}`;
  const maxCont = Math.floor(mainContentW / (INFO_SIZE * 0.52));
  const ct = contText.length > maxCont ? contText.substring(0, maxCont - 1) + "…" : contText;
  page.drawText(ct, { x: cx, y: cy, size: INFO_SIZE, font, color: DARK_GRAY });

  // Caja de premios
  cy -= 4 * s;
  const prizesTop = cy;
  const prizesBottom = bottomY + PRICE_SIZE + pad + 2;
  const prizesBoxH = prizesTop - prizesBottom;
  page.drawRectangle({ x: cx, y: prizesBottom, width: mainContentW, height: prizesBoxH, borderColor: LIGHT_GRAY, borderWidth: 0.3 });

  const phY = prizesTop - PRIZE_HEADER_SIZE - 2 * s;
  page.drawText("LISTA DE PREMIOS:", { x: cx + 3, y: phY, size: PRIZE_HEADER_SIZE, font: fontBold, color: BLACK });

  // Premios en 2 columnas (impares izq, pares der)
  const prizeLineH = PRIZE_SIZE + 1.2 * s;
  const prizeAreaTop = phY - PRIZE_HEADER_SIZE - 1;
  const prizeAreaH = prizeAreaTop - prizesBottom - 2;
  const maxLines = Math.min(Math.floor(prizeAreaH / prizeLineH), 10);
  const col1X = cx + 3;
  const col2X = cx + mainContentW * 0.5;
  const colW = mainContentW * 0.47;
  const maxChars = Math.floor(colW / (PRIZE_SIZE * 0.5));

  const c1 = config.prizes.filter((_, i) => i % 2 === 0);
  const c2 = config.prizes.filter((_, i) => i % 2 === 1);
  c1.forEach((p, i) => { if (i >= maxLines) return; const t = `${p.label} ${p.description}`; const tr = t.length > maxChars ? t.substring(0, maxChars-2)+".." : t; page.drawText(tr, { x: col1X, y: prizeAreaTop - i*prizeLineH, size: PRIZE_SIZE, font: fontItalic, color: DARK_RED }); });
  c2.forEach((p, i) => { if (i >= maxLines) return; const t = `${p.label} ${p.description}`; const tr = t.length > maxChars ? t.substring(0, maxChars-2)+".." : t; page.drawText(tr, { x: col2X, y: prizeAreaTop - i*prizeLineH, size: PRIZE_SIZE, font: fontItalic, color: DARK_RED }); });

  // Pie: VALOR a la izquierda, N° a la derecha
  page.drawText(config.priceLabel, { x: cx, y: bottomY, size: PRICE_SIZE, font: fontBold, color: BLACK });
  const numText = `N° ${ticketNumber}`;
  const numW = courierBold.widthOfTextAtSize(numText, NUM_SIZE);
  page.drawText(numText, { x: mainRight - numW, y: bottomY, size: NUM_SIZE, font: courierBold, color: DARK_RED });

  // === TALÓN DE CONTROL ===
  const sp = 4 * s;
  const scx = stubX + sp;
  const sr = stubX + stubW - sp;
  const scW = sr - scx;
  let sy = y + h - pad;

  // Título del talón centrado
  sy -= STUB_TITLE_SIZE;
  const stT = "TALÓN DE CONTROL";
  const stTW = fontBold.widthOfTextAtSize(stT, STUB_TITLE_SIZE);
  page.drawText(stT, { x: scx + (scW - stTW) / 2, y: sy, size: STUB_TITLE_SIZE, font: fontBold, color: BLACK });
  sy -= 3 * s;
  page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: LIGHT_GRAY });

  // Fecha del sorteo
  sy -= STUB_INFO_SIZE + 2 * s;
  const ds = "Sorteo: 19/06/2026";
  const dsW = font.widthOfTextAtSize(ds, STUB_INFO_SIZE);
  page.drawText(ds, { x: scx + (scW - dsW) / 2, y: sy, size: STUB_INFO_SIZE, font, color: MED_GRAY });

  // Campo nombre
  sy -= STUB_LABEL_SIZE + 4 * s;
  page.drawText("Nombre y Apellido:", { x: scx, y: sy, size: STUB_LABEL_SIZE, font: fontBold, color: BLACK });
  sy -= 4 * s;
  page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: DARK_GRAY });

  // Campo teléfono
  sy -= STUB_LABEL_SIZE + 4 * s;
  page.drawText("Teléfono:", { x: scx, y: sy, size: STUB_LABEL_SIZE, font: fontBold, color: BLACK });
  sy -= 4 * s;
  page.drawLine({ start: { x: scx, y: sy }, end: { x: sr, y: sy }, thickness: 0.25, color: DARK_GRAY });

  // Valor centrado
  sy -= STUB_VAL_SIZE + 5 * s;
  const vt = `Valor: ${formatCurrency(config.price)}`;
  const vtW = fontBold.widthOfTextAtSize(vt, STUB_VAL_SIZE);
  page.drawText(vt, { x: scx + (scW - vtW) / 2, y: sy, size: STUB_VAL_SIZE, font: fontBold, color: DARK_GRAY });

  // Número grande centrado
  sy -= STUB_NUM_SIZE + 3 * s;
  const sn = `N° ${ticketNumber}`;
  const snW = courierBold.widthOfTextAtSize(sn, STUB_NUM_SIZE);
  page.drawText(sn, { x: scx + (scW - snW) / 2, y: sy, size: STUB_NUM_SIZE, font: courierBold, color: DARK_RED });

  // Línea de corte horizontal debajo del ticket
  dashedLineH(page, x, y - 1, x + w, 4, 2.5, 0.2, LIGHT_GRAY);
}

// Dibuja una línea punteada vertical
function dashedLineV(page: PDFPage, x: number, yStart: number, yEnd: number, dash: number, gapLen: number, thickness: number, color: ReturnType<typeof rgb>) {
  let pos = yStart;
  while (pos < yEnd) {
    const end = Math.min(pos + dash, yEnd);
    page.drawLine({ start: { x, y: pos }, end: { x, y: end }, thickness, color });
    pos += dash + gapLen;
  }
}

// Dibuja una línea punteada horizontal
function dashedLineH(page: PDFPage, xStart: number, y: number, xEnd: number, dash: number, gapLen: number, thickness: number, color: ReturnType<typeof rgb>) {
  let pos = xStart;
  while (pos < xEnd) {
    const end = Math.min(pos + dash, xEnd);
    page.drawLine({ start: { x: pos, y }, end: { x: end, y }, thickness, color });
    pos += dash + gapLen;
  }
}

// Descarga el PDF generado como archivo
export function downloadPdf(pdfBytes: Uint8Array, filename: string) {
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
