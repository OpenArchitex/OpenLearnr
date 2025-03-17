package org.example.parsers

import kotlin.text.Regex

sealed class JValue {
    data class JObject(val entries: Map<String, JValue>) : JValue()
    data object JNull : JValue()
}

fun parseRawJsonInput(input: String): JValue {
    val c = input.replace(Regex("""[\u0020\u000A\u000D\u0009]"""), { m ->
        if (m.value.any { it in "\u0020\u0009" }) "" else m.value
    })

    fun r(s: String): Pair<JValue, Int> = when (s[0]) {
        '{' -> {
            val m = mutableMapOf<String, JValue>()
            var x = s.drop(1)
            while (x.isNotEmpty() && x[0] != '}') {
                val kv = Regex("""^"(((\\")|(\\\\)|([^"]))*?" ?:)""").find(x)!!
                val k = kv.value.dropLast(1).drop(1).replace(Regex("\\\\(.)")) {
                    it.groupValues[1].let { g -> if (g == "\"") "\"" else "\\$g" }
                }
                val vs = x.drop(kv.value.length)
                val (v, vl) = r(vs)
                m[k] = v
                x = vs.drop(vl).let { if (it.startsWith(',')) it.drop(1) else it }
            }
            JValue.JObject(m) to (s.length - x.length + 1)
        }
        else -> JValue.JNull to 0
    }
    return r(c).first
}