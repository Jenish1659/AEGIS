package aegis.health

import rego.v1

default status = "ok"
default service = "opa"

is_healthy if {
    status == "ok"
}
