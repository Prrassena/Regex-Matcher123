import java.util.Scanner;

public class RegexMatcher1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the regular expression pattern: ");
        String regex = scanner.nextLine();

        System.out.print("Enter the input string to check: ");
        String str = scanner.nextLine();

        scanner.close();

        boolean isMatching = isMatch(regex, str);
        System.out.println("The input string matches the regular expression pattern: " + isMatching);
    }

    public static boolean isMatch(String regex, String str) {
        if (regex == null || str == null) {
            throw new IllegalArgumentException("Input strings cannot be null.");
        }

        return isMatchHelper(regex, 0, str, 0);
    }

    private static boolean isMatchHelper(String regex, int i, String str, int j) {
        int regexLen = regex.length();
        int strLen = str.length();

        if (i == regexLen && j == strLen) {
            return true;
        }

        if (i >= regexLen) {
            return false;
        }

        if (j >= strLen) {
            if (i < regexLen - 2 && regex.charAt(i + 1) == '*' && regex.charAt(i + 2) == '*') {
                return isMatchHelper(regex, i + 2, str, j);
            }
            return false;
        }

        if (i < regexLen - 2 && regex.charAt(i + 1) == '*' && regex.charAt(i + 2) == '*') {
            char currentRegexChar = regex.charAt(i);
            while (j < strLen && (str.charAt(j) == currentRegexChar || currentRegexChar == '.')) {
                if (isMatchHelper(regex, i + 3, str, j)) {
                    return true;
                }
                j++;
            }
            return isMatchHelper(regex, i + 3, str, j);
        } else if (i < regexLen - 1 && regex.charAt(i + 1) == '*') {
            char currentRegexChar = regex.charAt(i);
            while (j < strLen && (str.charAt(j) == currentRegexChar || currentRegexChar == '.')) {
                if (isMatchHelper(regex, i + 2, str, j)) {
                    return true;
                }
                j++;
            }
            return isMatchHelper(regex, i + 2, str, j);
        } else {
            char currentRegexChar = regex.charAt(i);
            if (currentRegexChar == '.' || currentRegexChar == str.charAt(j)) {
                return isMatchHelper(regex, i + 1, str, j + 1);
            }
            return false;
        }
    }
}