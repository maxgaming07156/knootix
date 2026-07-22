import os
import glob
import re

directory = '/Users/apple/Clients/Knootix/Website/knootix web copy'
files = glob.glob(os.path.join(directory, '*.html'))

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Wrap core content
    content = content.replace('</nav>', '</nav>\n    <main id="swup" class="transition-fade">')
    content = content.replace('<footer>', '</main>\n    <footer>')

    # 2. Add swup script
    content = content.replace('<script src="script.js"></script>', '<script src="https://unpkg.com/swup@4"></script>\n    <script src="script.js"></script>')

    # 3. Add magnetic class
    content = re.sub(r'class="([^"]*\bbtn-primary\b[^"]*)"', lambda m: f'class="{m.group(1)} magnetic"' if 'magnetic' not in m.group(1) else m.group(0), content)
    content = re.sub(r'class="([^"]*\bbtn-ghost\b[^"]*)"', lambda m: f'class="{m.group(1)} magnetic"' if 'magnetic' not in m.group(1) else m.group(0), content)
    content = re.sub(r'class="([^"]*\bsocial-icon\b[^"]*)"', lambda m: f'class="{m.group(1)} magnetic"' if 'magnetic' not in m.group(1) else m.group(0), content)
    content = re.sub(r'class="([^"]*\bteam-social-icon\b[^"]*)"', lambda m: f'class="{m.group(1)} magnetic"' if 'magnetic' not in m.group(1) else m.group(0), content)

    # 4. index.html specific
    if os.path.basename(filepath) == 'index.html':
        content = content.replace('<script src="https://unpkg.com/swup@4"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n    <script src="https://unpkg.com/swup@4"></script>')
        content = content.replace('<section id="hero">\n      <div class="hero-glow"></div>', '<section id="hero">\n      <canvas id="hero-3d" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></canvas>\n      <div class="hero-glow"></div>')

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {os.path.basename(filepath)}")

print("All 15 files updated.")
