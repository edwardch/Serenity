namespace Serenity.CodeGeneration
{
    public class ExternalArgument
    {
        public string Type { get; set; }
        public object Value { get; set; }
        public string Name { get; set; }
        public bool IsOptional { get; set; }
        public bool HasDefault { get; set; }
    }
}