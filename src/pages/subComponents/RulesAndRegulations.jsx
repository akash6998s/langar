import React from "react";
import { FaPrayingHands, FaBell, FaChild, FaBan } from "react-icons/fa";

const RulesAndRegulations = () => {
  return (
    <section className="bg-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-yellow-200">
        <h2 className="text-4xl font-semibold text-center text-orange-700 mb-6">
          🛕 Temple Guidelines <br />
          <span className="text-lg text-gray-600 font-normal">मंदिर से जुड़ी आवश्यक जानकारी</span>
        </h2>

        <ul className="space-y-6 text-lg text-gray-800 leading-relaxed">
          <li>
            <FaPrayingHands className="inline text-orange-600 mr-2" />
            कृपया शांति बनाए रखें और मंदिर की पवित्रता का सम्मान करें।
            <br />
            <span className="text-sm text-gray-500">(Maintain peace and respect the sacred space.)</span>
          </li>
          <li>
            <FaPrayingHands className="inline text-orange-600 mr-2" />
            मंदिर में प्रवेश से पूर्व जूते-चप्पल बाहर उतारें।
            <br />
            <span className="text-sm text-gray-500">(Please remove footwear before entering.)</span>
          </li>
          <li>
            <FaBell className="inline text-orange-600 mr-2" />
            मोबाइल फोन साइलेंट रखें। ध्यान और भक्ति में बाधा न दें।
            <br />
            <span className="text-sm text-gray-500">(Keep phones on silent inside spiritual zones.)</span>
          </li>
          <li>
            <FaBan className="inline text-orange-600 mr-2" />
            धूम्रपान, मांसाहार व शराब मंदिर क्षेत्र में वर्जित है।
            <br />
            <span className="text-sm text-gray-500">(No smoking, alcohol, or non-veg allowed.)</span>
          </li>
          <li>
            <FaChild className="inline text-orange-600 mr-2" />
            बच्चे बड़ों की निगरानी में रहें। शोर न करें।
            <br />
            <span className="text-sm text-gray-500">(Children should be supervised and quiet.)</span>
          </li>
          <li>
            <FaPrayingHands className="inline text-orange-600 mr-2" />
            सेवक सेवा क्षेत्र में आईडी पहनकर रहें और नियमों का पालन करें।
            <br />
            <span className="text-sm text-gray-500">(Sewadars must wear ID and follow guidelines.)</span>
          </li>
        </ul>

        <p className="mt-8 text-center text-md text-gray-700 font-medium">
          🙏 यह नियम सभी भक्तों की सुविधा और भक्ति के वातावरण को बनाए रखने के लिए हैं।
        </p>
      </div>
    </section>
  );
};

export default RulesAndRegulations;
