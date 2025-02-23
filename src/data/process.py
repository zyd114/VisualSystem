import csv
import json

# 读取 CSV 文件并提取所需列
def extract_data_from_csv(csv_file_path):
    extracted_data = []
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            gender = row['Gender']
            age = row['Age']
            sleep_quality = row['Quality of Sleep']
            sleep_duration = row['Sleep Duration']

            extracted_data.append([gender, age, sleep_quality, sleep_duration])
    return extracted_data

# 保存数据到 JSON 文件
def save_data_to_json(data, json_file_path):
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

# 主函数
def main():
    csv_file_path = 'data.csv'  # 输入 CSV 文件路径
    json_file_path = 'data_Sex_Age_SD_SQ.json'  # 输出 JSON 文件路径
    
    extracted_data = extract_data_from_csv(csv_file_path)
    save_data_to_json(extracted_data, json_file_path)

# 运行主函数
if __name__ == "__main__":
    main()
