namespace ApiRozetka.Interfaces
{
    public interface IImageService
    {
        Task<string> SaveOptimizedImageAsync(IFormFile file);
        Task<string> SaveOptimizedImageAsync(string base64Image);
        Task RemoveImageAsync(string imageName);
    }
}
