# Vehicle Allocator

Calculates the **minimum number of cars needed** to carry all people after redistributing passengers.

---

## 📝 Problem

You have:
- `P[i]` = number of people in car `i`
- `S[i]` = available seats in car `i`

People can move between cars as long as seat limits are respected.  
Goal: **Minimize the number of cars needed**.

### Examples

```ts
P = [1, 4, 1], S = [1, 5, 1]  // Result: 2
P = [4, 4, 2, 4], S = [5, 5, 2, 5]  // Result: 3
P = [2, 3, 4, 2], S = [2, 5, 7, 2]  // Result: 2
