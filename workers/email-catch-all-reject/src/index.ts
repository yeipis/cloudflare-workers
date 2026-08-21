import type { ForwardableEmailMessage } from "@cloudflare/workers-types";

export interface Env {}

const REJECT_REASON =
  "Esta direccion no existe. Para mas ayuda, escribe a contact@yeipi.dev / This address does not exist. For further assistance, please email contact@yeipi.dev";

export default {
  async email(message: ForwardableEmailMessage, _env: Env, _ctx: ExecutionContext): Promise<void> {
    // Log para observabilidad en tiempo real en Cloudflare Dashboard
    console.log(`[Email Catch-All Reject] From: ${message.from} -> To: ${message.to}`);

    // Rechaza el correo emitiendo un rebote SMTP (código 550)
    message.setReject(REJECT_REASON);
  }
};
