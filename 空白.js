function maximizeEarnings(financialProducts, n) {
  const dp = new Array(n + 1).fill(0);
  for (const product of financialProducts) {
    const [months, earnings] = product;
    for (let i = months; i <= n; i++) {
      dp[i] = Math.max(dp[i], dp[i - months] + earnings);
    }
  }
  const maxEarnings = dp[n];
  const selectedProducts = [];
  let currentMonth = n;
  for (let i = financialProducts.length - 1; i >= 0; i--) {
    const [months, earnings] = financialProducts[i];
    while (currentMonth >= months && dp[currentMonth] === dp[currentMonth - months] + earnings) {
      selectedProducts.push(financialProducts[i]);
      currentMonth -= months;
    }
  }

  return selectedProducts;
}

// 示例输入
// const financialProducts = [
//   [1, 235],
//   [3, 902],
//   [6, 1873],
//   [9, 3654]
// ];
const financialProducts = [[2,602],[4,1275]]
const n = 7;

// 计算最大收益和选择的理财产品组合
const result = maximizeEarnings(financialProducts, n);
console.log(result);
