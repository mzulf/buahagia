# =========================
# CASE 1
# =========================

fruits = [
    {"fruitId": 1, "fruitName": "Apel", "fruitType": "IMPORT", "stock": 10},
    {"fruitId": 2, "fruitName": "Kurma", "fruitType": "IMPORT", "stock": 20},
    {"fruitId": 3, "fruitName": "apel", "fruitType": "IMPORT", "stock": 50},
    {"fruitId": 4, "fruitName": "Manggis", "fruitType": "LOCAL", "stock": 100},
    {"fruitId": 5, "fruitName": "Jeruk Bali", "fruitType": "LOCAL", "stock": 10},
    {"fruitId": 5, "fruitName": "KURMA", "fruitType": "IMPORT", "stock": 20},
    {"fruitId": 5, "fruitName": "Salak", "fruitType": "LOCAL", "stock": 150},
]

# 1. Ambil daftar nama buah (unik, case-insensitive)
def get_fruit_names(fruits):
    return list(set(f["fruitName"].lower() for f in fruits))


# 2. Kelompokkan berdasarkan fruitType
def group_by_type(fruits):
    result = {}
    for f in fruits:
        tipe = f["fruitType"]
        if tipe not in result:
            result[tipe] = []
        result[tipe].append(f["fruitName"])
    return result


# 3. Hitung total stock tiap tipe
def total_stock_per_type(fruits):
    result = {}
    for f in fruits:
        tipe = f["fruitType"]
        result[tipe] = result.get(tipe, 0) + f["stock"]
    return result


# 4. Komentar terhadap data
def komentar():
    return """
Komentar:
1. Terdapat duplikasi fruitId (id = 5 muncul lebih dari satu kali).
2. Penulisan fruitName tidak konsisten (Apel, apel, KURMA).
3. Sebaiknya dilakukan normalisasi data:
   - gunakan format huruf konsisten (lowercase/capitalized)
   - fruitId harus unik
4. Data tidak bersih dapat menyebabkan kesalahan analisis.
"""


# =========================
# CASE 2
# =========================

comments = [
    {
        "commentId": 1,
        "commentContent": "Hai",
        "replies": [
            {
                "commentId": 11,
                "commentContent": "Hai juga",
                "replies": [
                    {"commentId": 111, "commentContent": "Haai juga hai jugaa"},
                    {"commentId": 112, "commentContent": "Haai juga hai jugaa"},
                ],
            },
            {
                "commentId": 12,
                "commentContent": "Hai juga",
                "replies": [
                    {"commentId": 121, "commentContent": "Haai juga hai jugaa"}
                ],
            },
        ],
    },
    {
        "commentId": 2,
        "commentContent": "Halooo",
    },
]

# Fungsi rekursif hitung total komentar
def count_comments(comments):
    total = 0
    for c in comments:
        total += 1
        if "replies" in c and c["replies"]:
            total += count_comments(c["replies"])
    return total


# =========================
# MAIN PROGRAM
# =========================

if __name__ == "__main__":
    print("=== CASE 1 ===")

    # 1
    print("1. Nama buah unik:")
    print(get_fruit_names(fruits))

    # 2
    grouped = group_by_type(fruits)
    print("\n2. Pengelompokan buah:")
    print(grouped)
    print("Jumlah wadah:", len(grouped))

    # 3
    print("\n3. Total stock tiap tipe:")
    print(total_stock_per_type(fruits))

    # 4
    print("\n4. Komentar:")
    print(komentar())

    print("\n=== CASE 2 ===")

    # Hitung total komentar
    total = count_comments(comments)
    print("Total komentar:", total)