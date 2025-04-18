import os
import glob
from PIL import Image

def batch_delete(root_dir):

    pattern = os.path.join(root_dir, '**', '*.JPG')

    for img_path in glob.glob(pattern, recursive=True):
        try:
            print(f"Processing: {img_path}")
            os.remove(img_path)
            print(f"Deleted: {img_path}")

        except Exception as e:
            print(f"Error processing {img_path}: {e}")


gallery_directory = 'gallery' 
batch_delete(gallery_directory) 
    
print("\nConversion process finished!")