def most_frequent_char_count(s):
    # 将输入字符串转换为小写
    s = s.lower()
    # 创建一个字典来存储每个字符的出现次数
    char_count = {}
    # 遍历字符串，计算每个字符的出现次数
    for char in s:
        if char.isalnum():  # 只考虑字母和数字
            char_count[char] = char_count.get(char, 0) + 1
    if not char_count:
        return 0  # 如果没有字母或数字，则返回0
    # 找到出现次数最多的字符的次数
    max_count = max(char_count.values())
    return max_count

# 示例用法
input_str1 = "abcde"
input_str2 = "aabbcde"
input_str3 = "aA11"

output1 = most_frequent_char_count(input_str1)
output2 = most_frequent_char_count(input_str2)
output3 = most_frequent_char_count(input_str3)

print("示例 1 输出:", output1)
print("示例 2 输出:", output2)
print("示例 3 输出:", output3)
