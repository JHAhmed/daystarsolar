import os
import glob
import shutil
from PIL import Image

def batch_process(root_dir):
    pattern = os.path.join(root_dir, '**', '*.webp')
    visited_dirs = set()

    for img_path in glob.glob(pattern, recursive=True):
        dir_path = os.path.dirname(img_path)

        if dir_path in visited_dirs:
            continue  # already processed this dir

        try:
            visited_dirs.add(dir_path)
            project_name = os.path.basename(dir_path)
            new_filename = f"{project_name}.webp"
            new_path = os.path.join("gallery", new_filename)

            shutil.copy(img_path, new_path)
        except Exception as e:
            print(f"Error processing {img_path}: {e}")

gallery_directory = 'gallery' 
batch_process(gallery_directory) 

print("\nProcessing process finished!")
