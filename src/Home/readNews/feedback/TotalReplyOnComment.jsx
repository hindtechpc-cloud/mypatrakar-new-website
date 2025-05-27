export default function TotalreplyOnComment({ replies }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-500">Replies</h4>
      
      {replies?.map((reply) => (
        <div key={reply.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-xs">
            {reply.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <h5 className="text-sm font-medium text-gray-900">{reply.name}</h5>
              <span className="text-xs text-gray-500">
                {new Date(reply.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-700">{reply.reply}</p>
          </div>
        </div>
      ))}
    </div>
  );
}