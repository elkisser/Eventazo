-- ================================================================
-- Migración: Confirmación automática de emails y función de confirmación
-- ================================================================

-- 1. Confirmar inmediatamente la cuenta de andreaarceguet@gmail.com
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
    confirmed_at = COALESCE(confirmed_at, NOW()),
    last_sign_in_at = NOW()
WHERE email = 'andreaarceguet@gmail.com';

-- 2. Confirmar cualquier otro usuario pendiente en desarrollo
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
    confirmed_at = COALESCE(confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- 3. Función RPC segura para auto-confirmar emails desde el cliente si es necesario
CREATE OR REPLACE FUNCTION public.confirm_user(email_to_confirm text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = NOW(),
      confirmed_at = NOW()
  WHERE email = LOWER(TRIM(email_to_confirm));

  RETURN true;
END;
$$;

-- Permitir invocar la función desde anon y authenticated
GRANT EXECUTE ON FUNCTION public.confirm_user(text) TO anon, authenticated;

-- 4. Trigger para auto-confirmar emails en nuevos registros (sin esperar correo)
CREATE OR REPLACE FUNCTION public.handle_auto_confirm_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, NOW());
  NEW.confirmed_at = COALESCE(NEW.confirmed_at, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_auto_confirm ON auth.users;
CREATE TRIGGER on_auth_user_auto_confirm
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auto_confirm_email();
