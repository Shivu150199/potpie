import React, { useState, useEffect } from "react";
import { MdInfo } from "react-icons/md";
import arrowsidebar from "../../arrow-sidebar.png";
import InputWrapper from "../atoms/InputWrapper";
import { fetch } from "../utils/mockFetch";
const Configuration = () => {
  const [dependencies, setDependencies] = useState([]);
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [isDatabaseMocked, setIsDatabaseMocked] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState('POST /carts/{cart_id}');
  const [isLoading, setIsLoading] = useState(true);
  const [dbConfig, setDbConfig] = useState({
    username: '',
    password: '',
    hostname: ''
  });

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/dependencies');
        const data = await response.json();
        setDependencies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching dependencies:', error);
        setDependencies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDependencies();
  }, []);

  const handleDependencyChange = (item) => {
    setSelectedDependencies(prev => {
      if (prev.includes(item)) {
        return prev.filter(dep => dep !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleFlowChange = (e) => {
    setSelectedFlow(e.target.value);
  };

  const handleDbConfigChange = (e) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const payload = {
      flow: selectedFlow,
      entities_to_mock: selectedDependencies,
      is_db_mocked: isDatabaseMocked,
      db_config: isDatabaseMocked ? null : dbConfig
    };

    try {
      await fetch("/configuration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-[94.7vh] bg-[#363636] text-white flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        <ul>
          <li className="py-1 cursor-pointer">
            <p className="block font-bold text-xl my-2">cart_campaign</p>
            <div className="mt-5">
              <span className="flex items-center font-medium text-[16px] py-2 text-white">
                <MdInfo className="text-[#FF7A00] mr-2" /> Last 2 commits scanned
              </span>
              <span className="flex items-center font-medium text-[16px] text-white">
                <MdInfo className="text-[#FF7A00] mr-2" /> 5 entry points identified
              </span>
            </div>
          </li>
          <li className="py-1 my-3 cursor-pointer">
            <label className="block font-medium text-[16px] mb-3">
              Selected flow
            </label>
            <select
              value={selectedFlow}
              onChange={handleFlowChange}
              className="w-full bg-[#363636] border-[#D9D9D9] border-2 rounded-lg mt-1 p-2 appearance-none custom-arrow"
            >
              <option className="font-medium text-[16px] text-white">
                POST /carts/{"{cart_id}"}
              </option>
            </select>
          </li>
          <li className="py-2 cursor-pointer">
            <label className="block font-medium text-base">Dependencies</label>
            <span className="text-sm text-[#B7B7B7]">
              Select the ones you want to mock
            </span>
            <div className="mt-2.5 pr-1">
              {isLoading ? (
                <div>Loading dependencies...</div>
              ) : (
                <div>
                  {dependencies.map((item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center mb-4 pb-0.5"
                    >
                      <div className="flex justify-center items-center">
                        <input
                          id={item}
                          type="checkbox"
                          checked={selectedDependencies.includes(item)}
                          onChange={() => handleDependencyChange(item)}
                          className="custom-radio rounded"
                        />
                        <label
                          htmlFor={item}
                          className="ms-2 text-[15px] font-medium text-white"
                        >
                          {item}
                        </label>
                      </div>
                      <div className="image">
                        <img
                          src={arrowsidebar}
                          alt="logo"
                          className="w-[13px] h-[13px] mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li className="pt-3 pb-2 cursor-pointer">
            <label className="block font-medium text-base">Databases</label>
            <span className="text-sm text-[#B7B7B7]">
              Select if you want to mock databases
            </span>
            <div className="mt-2.5 pr-1">
              <div className="flex justify-between items-center mb-4 pb-0.5">
                <div className="flex justify-center items-center">
                  <input
                    id="mock-databases"
                    name="mock-database-option"
                    type="radio"
                    checked={isDatabaseMocked}
                    onChange={() => setIsDatabaseMocked(true)}
                    className="custom-radio rounded"
                  />
                  <label
                    htmlFor="mock-databases"
                    className="ms-2 text-[15px] font-medium text-white"
                  >
                    I want to mock databases
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4 pb-0.5">
                <div className="flex justify-center items-center">
                  <input
                    id="dont-mock-databases"
                    name="mock-database-option"
                    type="radio"
                    checked={!isDatabaseMocked}
                    onChange={() => setIsDatabaseMocked(false)}
                    className="custom-radio rounded"
                  />
                  <label
                    htmlFor="dont-mock-databases"
                    className="ms-2 text-[15px] font-medium text-white"
                  >
                    I don't want to mock databases
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li className={`cursor-pointer ${isDatabaseMocked ? 'opacity-50' : ''}`}>
            <label className="block font-medium">Database Configurations</label>
            <div className={`mt-7 ${isDatabaseMocked ? 'pointer-events-none' : ''}`}>
              <label className="block w-full">
                <InputWrapper
                  type="text"
                  name="username"
                  value={dbConfig.username}
                  onChange={handleDbConfigChange}
                  disabled={isDatabaseMocked}
                  label="Database User"
                  className={isDatabaseMocked ? 'bg-gray-600 cursor-not-allowed' : ''}
                />
              </label>
              <label className="block">
                <InputWrapper
                  type="password"
                  name="password"
                  value={dbConfig.password}
                  onChange={handleDbConfigChange}
                  disabled={isDatabaseMocked}
                  label="Database Password"
                  className={isDatabaseMocked ? 'bg-gray-600 cursor-not-allowed' : ''}
                />
              </label>
              <label className="block">
                <InputWrapper
                  type="text"
                  name="hostname"
                  value={dbConfig.hostname}
                  onChange={handleDbConfigChange}
                  disabled={isDatabaseMocked}
                  label="Database Hostname"
                  className={isDatabaseMocked ? 'bg-gray-600 cursor-not-allowed' : ''}
                />
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-4 mt-1 border-t z-10 w-full border-[#505050] flex justify-end">
        <button
          type="submit"
          onClick={handleSave}
          className="w-1/4 bg-blue-600 p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Configuration;