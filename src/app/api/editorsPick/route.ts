import prisma from "@/lib/connectdb";

export const GET = async () => {
  const editorsPick = await prisma.post.findMany({
    where: {
      editorsPick: true,
    },
    take: 5,
    include: {
      user: true,
    },
  });

  if (!editorsPick) {
    return new Response(JSON.stringify({ message: "No editors pick found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(editorsPick), {
    status: 200,
  });
};
