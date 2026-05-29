#!/usr/bin/env bash
# Generate clear Arabic audio clips with the macOS `say` voice (Maged, ar_SA).
# Output: public/audio/{letters,words,harakat}/*.m4a — matches the paths in
# lib/data.ts (letterClip / wordClip / harakaClip). Re-run after editing LETTERS.
#
# Usage:  bash scripts/gen-audio.sh
set -euo pipefail

VOICE="${VOICE:-Maged}"
RATE="${RATE:-150}"   # words per minute; lower = clearer for kids
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/audio"

mkdir -p "$OUT/letters" "$OUT/words" "$OUT/harakat"

gen() { # text  outfile
  say -v "$VOICE" -r "$RATE" -o "$2" --file-format=m4af --data-format=aac "$1"
}

# Vocalized for TTS clarity (e.g. أَلِف not ألف, which Maged reads as the number 1000).
names=(أَلِف بَاء تَاء ثَاء جِيم حَاء خَاء دَال ذَال رَاء زَاي سِين شِين صَاد ضَاد طَاء ظَاء عَيْن غ فَاء قَاف كَاف ل مِيم نُون هَاء وَاو يَاء)
words=(أَرنب بَطَّة تُفّاحة ثَعلب جَمَل حِصان خَروف دُبّ ذِئب رُمّان زَرافة سَمَكة شَمس صَقر ضِفدع طائر ظَبي عُصفور غَزال فيل قِطّ كَلب لَيمون مَوز نَحلة هُدهُد وَردة يَمامة)
letters=(ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي)

fatha=$'َ'; damma=$'ُ'; kasra=$'ِ'

for i in "${!names[@]}"; do
  gen "${names[$i]}" "$OUT/letters/$i.m4a"
  gen "${words[$i]}" "$OUT/words/$i.m4a"
  gen "${letters[$i]}${fatha}" "$OUT/harakat/$i-a.m4a"
  gen "${letters[$i]}${damma}" "$OUT/harakat/$i-u.m4a"
  gen "${letters[$i]}${kasra}" "$OUT/harakat/$i-i.m4a"
  echo "✓ ${names[$i]}"
done

echo "Done → $OUT"
