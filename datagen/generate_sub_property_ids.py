import uuid


def generate_uuids(num_uuids):
    uuids = [str(uuid.uuid4()) for _ in range(num_uuids)]
    return uuids


def write_uuids_to_file(uuids, filename):
    with open(filename, 'w') as file:
        for uuid_str in uuids:
            file.write(uuid_str + '\n')


if __name__ == "__main__":
    num_uuids = 5000
    uuids = generate_uuids(num_uuids)
    filename = "uuids.txt"
    write_uuids_to_file(uuids, filename)
    print(f"{num_uuids} UUIDs have been generated and written to {filename}.")
