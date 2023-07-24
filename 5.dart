void main() {
  print("Enter a long string containing multiple words:");
  String input = 'My name is Michele';
  List<String> words = input.split(' ');
  String reversedString = words.reversed.join(' ');
  print(reversedString);
}
