package aegis.health_test

import rego.v1
import data.aegis.health

test_health_is_ok if {
    health.status == "ok"
    health.is_healthy
}
