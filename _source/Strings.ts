class Strings {

  public static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  public static conjoin(strs: string[]): string {
    return strs.map(x => `${Strings.capitalize(x)}.`).join(' ');
  }

}
