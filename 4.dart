List<int> getFirstAndLastElements(List<int> inputList) {
  return [inputList.first, inputList.last];
}

void main() {
  List<int> a = [5, 10, 15, 20, 25];
  List<int> result = getFirstAndLastElements(a);
  print(result);
}
