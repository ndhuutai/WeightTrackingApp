namespace WeightTrackingApp.Models.Repository
{
    public interface IRepositoryWrapper
    {
        IWeightRepository WeightEntries { get;}
        IProgramRepository Program { get; }
        void Save();
    }
}