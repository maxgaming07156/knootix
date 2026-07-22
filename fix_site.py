import os
import re
import glob

# The generic avatar SVG data URI
AVATAR_URI = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234db88a"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
THREE_SCRIPT = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'

for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Replace all pravatar links with the generic avatar
    content = re.sub(r'https://i\.pravatar\.cc/300\?u=[a-zA-Z0-9]+', AVATAR_URI, content)

    # 2. Inject Three.js into all files that don't have it (just before Swup)
    if THREE_SCRIPT not in content:
        # Find the swup script and prepend Three.js
        content = content.replace(
            '<script src="https://unpkg.com/swup@4"></script>',
            THREE_SCRIPT + '\n    <script src="https://unpkg.com/swup@4"></script>'
        )

    with open(filepath, 'w') as f:
        f.write(content)

print("Fixes applied.")
