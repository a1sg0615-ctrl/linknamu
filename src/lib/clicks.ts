import { getMongoClient } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number };

async function getCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const collection = await getCollection();
    if (!collection) return {};
    const docs = await collection.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(linkId: string): Promise<number | null> {
  const collection = await getCollection();
  if (!collection) return null;
  const result = await collection.findOneAndUpdate(
    { _id: linkId },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return result?.count ?? null;
}
