import re

with open('about.html', 'r') as f:
    content = f.read()

# Remove the team-socials div and all its contents
content = re.sub(r'\s*<div class="team-socials">.*?</div>', '', content, flags=re.DOTALL)

with open('about.html', 'w') as f:
    f.write(content)

print("Socials removed.")
