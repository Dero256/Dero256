List<T> removeDuplicates<T>(List<T> inputList) {
  return inputList.toSet().toList();
}

void main() {
  List<int> a = [1, 2, 2, 3, 3, 4, 5, 5, 5];
  List<int> result = removeDuplicates(a);
  print(result);
}
