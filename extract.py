import json

log_path = r"C:\Users\SHAHAB COMPUTERS\.gemini\antigravity\brain\e9b94960-b16d-4daa-9734-25e3298f0567\.system_generated\logs\overview.txt"
out_path = r"d:\test\product_detail_raw.txt"

with open(log_path, "r", encoding="utf-8") as f:
    for line in f:
        if '"step_index":849' in line:
            obj = json.loads(line)
            with open(out_path, "w", encoding="utf-8") as out:
                out.write(obj["content"])
            print("Successfully extracted to", out_path)
            break
