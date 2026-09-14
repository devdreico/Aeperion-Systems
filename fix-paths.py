"""
Post-build script for Next.js static export.
Fixes relative asset paths in nested HTML files so they work with file:// and static servers.

Next.js with assetPrefix: './' generates paths like ./_next/static/js/...
At root level (out/index.html), ./_next/ resolves correctly.
But in subdirectories (out/about/index.html), ./_next/ resolves to about/_next/ which doesn't exist.

This script rewrites paths to use the correct relative depth based on file location.
"""
import os
import re
import sys
import shutil

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def get_depth(rel_path: str) -> int:
    """Calculate directory depth from root. out/index.html → 0, out/about/index.html → 1"""
    dirname = os.path.dirname(rel_path)
    if not dirname or dirname == ".":
        return 0
    return len(dirname.split(os.sep))

def fix_html_file(filepath: str, depth: int) -> bool:
    """Fix relative paths in an HTML file. Returns True if changes were made."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    
    if depth == 0:
        pass
    else:
        prefix = "../" * depth
        content = content.replace('./_next/', f'{prefix}_next/')
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def copy_to_root():
    """Copy contents of out/ to repository root for GitHub Pages main branch deployment."""
    if not os.path.isdir(OUT_DIR):
        return
    
    # Ensure .nojekyll exists in out/ as well
    nojekyll_path = os.path.join(OUT_DIR, ".nojekyll")
    if not os.path.exists(nojekyll_path):
        with open(nojekyll_path, "w") as f:
            f.write("")

    items_to_copy = os.listdir(OUT_DIR)
    for item in items_to_copy:
        if item in ["src", ".git", "node_modules", ".github", "venv", "__pycache__", "fix-paths.py", "package.json", "package-lock.json", "tsconfig.json", "README.md", "AGENTS.md", ".gitignore", "next.config.ts"]:
            continue
            
        src_path = os.path.join(OUT_DIR, item)
        dst_path = os.path.join(ROOT_DIR, item)
        
        if os.path.isdir(src_path):
            if os.path.exists(dst_path):
                shutil.rmtree(dst_path)
            shutil.copytree(src_path, dst_path)
        else:
            shutil.copy2(src_path, dst_path)
    print("🚀 Archivos de out/ copiados al directorio raíz para despliegue en main.")

def main():
    if not os.path.isdir(OUT_DIR):
        print(f"❌ Error: {OUT_DIR} no existe. Ejecuta 'npm run build' primero.")
        sys.exit(1)
    
    fixed_count = 0
    total_files = 0
    
    for root, dirs, files in os.walk(OUT_DIR):
        for filename in files:
            if not filename.endswith(".html"):
                continue
            
            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, OUT_DIR)
            depth = get_depth(rel_path)
            
            total_files += 1
            if fix_html_file(filepath, depth):
                fixed_count += 1
                if depth > 0:
                    print(f"  🔧 Fixed [{depth} levels deep]: {rel_path}")
    
    print(f"\n📊 Post-build: {fixed_count}/{total_files} HTML files fixed")
    
    # Copy static export files to root for GitHub Pages main deployment
    copy_to_root()
    return 0

if __name__ == "__main__":
    main()
