abstract class NODE {

    // For name check
    public static section_names: Array<string> = [];

    // For duration check
    public static section_durations: Map<string, number> = new Map();

    // For PRINT to print these parts x number of times and in specific order
    public static xml: Map<string, string> = new Map();


    abstract parse(): void;
    abstract evaluate(): void;
    abstract support_check(): void;
    abstract name_check(): void;
    abstract duration_check(): void;
    abstract clef_check(): void;  // to check if stacked sections in print are different clefs

    abstract get_xml(): string;
}

export default NODE;