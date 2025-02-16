export default function Loding() {
  return(
    <div className="w-full h-screen bg-mainBackcolor flex items-center flex-col justify-center">
      <div className="mb-4 text-2xl text-pointBlue">Loding</div>
      <div className="flex items-center justify-center space-x-2">
        <div
          className="w-3 h-3 bg-pointBlue rounded-full animate-bounce"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="w-3 h-3 bg-pointBlue rounded-full animate-bounce"
          style={{ animationDelay: '0.3s' }}
        />
        <div
          className="w-3 h-3 bg-pointBlue rounded-full animate-bounce"
          style={{ animationDelay: '0.6s' }}
        />        
      </div>
    </div>
  );
}