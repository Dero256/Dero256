void main() {
  List<int> a = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  for (int element in a) {
    if (element < 5) {
      print(element);
    }
  }
}
