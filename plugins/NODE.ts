abstract class NODE {

    // For name check
    public static section_names: Array<string> = [];

    // For duration check
    public static section_durations: Map<string, string> = new Map();



    abstract parse(): void;
    abstract evaluate(): void;
    abstract name_check(): void;
    abstract duration_check(): void;
}

export default NODE;