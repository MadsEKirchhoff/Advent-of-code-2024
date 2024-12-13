import { assertEquals, assertLessOrEqual } from "@std/assert";
import { add } from "./helloworld.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});

Deno.test(function day1test() {

})