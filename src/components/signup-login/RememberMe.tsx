

export default function RememberMe() {
  return (
        <div className="w-full flex justify-end items-center">
            <label className="flex items-center space-x-2">
                <span className="text-xs text-black-100 text-center">
                    من را به خاطر بسپار
                </span>
                <input className="align-middle shadow-check accent-white"
                    type="checkbox"
                />
            </label>
        </div>
  )
}
