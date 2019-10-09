class Random {

  public static fromArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}
