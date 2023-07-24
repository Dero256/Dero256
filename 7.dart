import 'dart:convert';

void main() {
  String jsonData = '''
  {
    "May": 3,
    "May": 5,
    "November": 2,
    "December": 1,
    "December": 4,
    "December": 2
  }
  ''';

  Map<String, dynamic> birthdayData = jsonDecode(jsonData);
  
  Map<String, int> monthsWithCount = {};

  birthdayData.forEach((month, count) {
    if (monthsWithCount.containsKey(month)) {
      monthsWithCount[month] += count;
    } else {
      monthsWithCount[month] = count;
    }
  });

  print("Months of birthdays: ${monthsWithCount.keys}");
  
  String highestMonth = monthsWithCount.keys.reduce((a, b) => monthsWithCount[a]! > monthsWithCount[b]! ? a : b);
  String lowestMonth = monthsWithCount.keys.reduce((a, b) => monthsWithCount[a]! < monthsWithCount[b]! ? a : b);
  
  print("Month with the highest number of birthdays: $highestMonth");
  print("Month with the lowest number of birthdays: $lowestMonth");
}
