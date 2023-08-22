import requests
import json


r = requests.get("https://api.quran.com/api/v4/quran/verses/uthmani_tajweed")

verses = r.json()['verses']
# print(json.dumps(verses))
QURAN = {'chapters': []}
# chapter = {'id': None, 'verses': []}

def get_chapter(num):
    chapter = {'id': num, 'verses': []}
    for verse in verses:
        if int(verse['verse_key'][0]) == num:
            chapter['verses'].append({'verse_key', verse['verse_key'], 'text', verse['text_uthmani_tajweed']})
        elif int(verse['verse_key'][0]) == num+1:
            return chapter
print(get_chapter(111))

# for num in range(1, 115):
    # QURAN['chapters'].append(get_chapter(num))
# print(QURAN)

# for verse in verses:
#     if not int(verse['verse_key'][0]) == num:
#         QURAN.append(sura)
#         num += 1
#     sura['id'] = num
#     sura['verses'] += [verse["text_uthmani_tajweed"]]
#     sura['verse_key'] = verse["verse_key"]

# print(QURAN)
