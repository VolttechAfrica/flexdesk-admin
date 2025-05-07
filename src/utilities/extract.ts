function extractJSON(text: string): string {
    return text.replace(/```json\s*([\s\S]*?)\s*```/, '$1').trim();
}

export default extractJSON