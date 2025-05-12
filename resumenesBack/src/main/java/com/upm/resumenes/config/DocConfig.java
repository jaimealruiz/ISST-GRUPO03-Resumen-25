package com.upm.resumenes.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(
        title = "Resumen.es API",
        version = "1.0",
        description = """
        ## 🔐 Control de Acceso y Autorización

        Esta API está diseñada con distintos niveles de acceso en función del tipo de usuario y su estado:

        - 🔓 **Usuarios no autenticados**: pueden consultar documentos gratuitos, ver información pública y registrarse.
        - 🔐 **Usuarios autenticados sin suscripción activa**: tienen acceso a su perfil, historial y pueden ver documentos gratuitos, pero no los de pago.
        - 💳 **Usuarios autenticados con suscripción activa**: acceden a todos los documentos, ya sean gratuitos o premium.
        - ✍️ **Usuarios escritores**: además de lo anterior, pueden subir documentos, ver estadísticas de sus contenidos y solicitar retiros de saldo.

        ### 🧭 Comportamiento por Endpoint

        - `GET /documents`: siempre accesible. Si el usuario no está autenticado o no tiene suscripción, se devuelven solo los documentos gratuitos.
        - `GET /documents/{id}`: mismo criterio que el anterior, pero para un único documento.
        - `POST /documents`: solo accesible para usuarios autenticados con rol de escritor.
        - `POST /subscription/checkout`: solo si el usuario está autenticado y su suscripción está caducada.
        - `POST /stripe/webhook`: reservado exclusivamente para Stripe.
        - `GET /writer/dashboard`, `POST /writer/retirar`: solo para escritores autenticados.

        La lógica de control de acceso se gestiona con JWT y se refuerza en cada controlador mediante validación personalizada.
        """
    )
)
@Configuration
public class DocConfig {
}
