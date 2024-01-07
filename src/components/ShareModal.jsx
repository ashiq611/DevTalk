import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, XIcon } from "react-share";

const ShareModal = ({url}) => {
   
    return (
      <div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="m-5 text-2xl font-bold">Share Your Blog</h2>
            <div className="flex gap-5">
              <div>
                <FacebookShareButton
                  url={url}
               
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div>
                <FacebookMessengerShareButton
                  url={url}
                  appId="521270401588372"
             
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </div>
              <div>
                <TwitterShareButton
                  url={url}
                
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  url={url}
                 
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
};

export default ShareModal;