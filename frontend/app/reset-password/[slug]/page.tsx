import ResetPasswordForm from "@/app/components/ResetPasswordForm";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
          Reset Password
        </h1>
        {/* ✅ Pass slug as prop */}
        <ResetPasswordForm slug={slug} />
      </div>
    </div>
  );
}
