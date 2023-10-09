def minCostPath(grid, x, y):
    if not grid or x < 0 or y < 0:
        return None
    rows, cols = len(grid), len(grid[0])
    # 创建一个与输入数组相同大小的二维数组，用于存储到达每个坐标的最小成本
    dp = [[0] * cols for _ in range(rows)]
    # 初始化第一个坐标
    dp[0][0] = grid[0][0]
    # 初始化第一行和第一列
    for i in range(1, rows):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    for j in range(1, cols):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    # 逐步计算每个坐标的最小成本
    for i in range(1, rows):
        for j in range(1, cols):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    # 返回目标坐标的最小成本
    return dp[x][y]
# 示例用法
grid = [
    [1, 2, 3],
    [4, 1, 2],
    [1, 5, 3]
]

x, y = 1, 2

result = minCostPath(grid, x, y)
print("最小成本路径的值:", result)
