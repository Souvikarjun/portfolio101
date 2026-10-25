import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function POST(request) {
  let data;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const { name, email, message } = data ?? {};
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    !trimmedName ||
    trimmedName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ||
    trimmedEmail.length > 254 ||
    !trimmedMessage ||
    trimmedMessage.length > 5000
  ) {
    return NextResponse.json(
      { error: "Please provide a valid name, email address, and message." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    await ContactMessage.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });
  } catch (error) {
    console.error("Failed to save contact form submission:", error);
    return NextResponse.json(
      { error: "Sorry, your message could not be saved. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Message saved successfully." }, { status: 201 });
}
