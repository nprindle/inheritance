class Random {

  public static bool(chance: number = 0.5): boolean {
    return Math.random() < chance;
  }

  public static intBetween(min: number, max: number): number {
    return (Math.random() * (max - min) + min) << 0;
  }

  public static fromArray<T>(arr: T[]): T {
    return arr[Random.intBetween(0, arr.length)];
  }

}
