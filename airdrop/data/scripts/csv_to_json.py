import json
import csv
import sys

output = []

with open(sys.argv[1]) as fle:
    f = csv.DictReader(fle)
    for line in f:
        if int(line['amounts']) > 0:
            obj = {}
            obj['address'] = line['address']
            # convert to string to match js merkle code's expected format
            obj['amount'] = int(line['amounts'])

            output.append(obj)

dump = json.dumps(output)

with open(sys.argv[2] + '.json', 'w') as fle:
    fle.write(dump)