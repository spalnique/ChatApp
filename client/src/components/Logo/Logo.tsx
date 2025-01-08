import { useNavigate } from 'react-router';
import type { FC, MouseEventHandler, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGElement> & { clickable?: boolean };

const Logo: FC<Props> = ({ clickable, ...props }) => {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<SVGElement> = () => {
    if (clickable) navigate('/');
  };

  return (
    <div className="flex justify-center py-3 align-middle">
      <svg
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          margin: '0 auto',
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 32"
        {...props}
      >
        <path d="M35.652 14.023c-0.264-0.082-0.544 0.062-0.628 0.325-0.083 0.263 0.062 0.544 0.325 0.628 3.908 1.245 5.651 3.102 5.651 6.024 0 2.599-2.371 4.616-3.783 5.588-0.136 0.094-0.217 0.247-0.217 0.412v3.823c-0.73-0.272-2.003-0.89-3.126-2.155-0.117-0.131-0.295-0.191-0.468-0.159-0.285 0.055-0.576 0.133-0.871 0.212-0.51 0.137-1.036 0.279-1.535 0.279-2.568 0-4.366-0.552-6.204-1.903-0.224-0.164-0.535-0.115-0.699 0.107-0.164 0.223-0.116 0.535 0.106 0.699 2.027 1.49 3.996 2.097 6.797 2.097 0.631 0 1.223-0.159 1.795-0.313 0.178-0.049 0.355-0.097 0.53-0.138 1.869 1.974 3.983 2.423 4.075 2.441 0.033 0.007 0.066 0.010 0.1 0.010 0.114 0 0.227-0.039 0.316-0.113 0.117-0.095 0.184-0.237 0.184-0.387v-4.239c2.582-1.841 4-4.057 4-6.261 0-3.381-2.017-5.598-6.348-6.977zM33 13.5c0-7.696-7.018-13.5-16.323-13.5-9.352 0-16.677 5.931-16.677 13.502 0 4.539 3.211 7.791 6 9.759v6.636c0 0.17 0.086 0.327 0.228 0.42 0.083 0.053 0.177 0.080 0.272 0.080 0.069 0 0.139-0.015 0.205-0.044 0.146-0.065 3.559-1.616 6.479-4.809 1.265 0.235 2.696 0.461 3.994 0.461 9.463 0 15.822-5.026 15.822-12.505zM17.177 25.005c-1.31 0-2.799-0.251-4.083-0.496-0.173-0.031-0.351 0.028-0.468 0.159-2.050 2.312-4.459 3.781-5.626 4.414v-6.082c0-0.165-0.081-0.318-0.217-0.412-2.638-1.815-5.783-4.863-5.783-9.086 0-7.011 6.886-12.502 15.677-12.502 8.736 0 15.323 5.374 15.323 12.5 0 6.882-5.957 11.505-14.823 11.505zM16.5 11.5c-1.103 0-2 0.897-2 2s0.897 2 2 2 2-0.897 2-2-0.897-2-2-2zM16.5 14.5c-0.551 0-1-0.448-1-1s0.449-1 1-1 1 0.448 1 1-0.449 1-1 1zM23.5 11.5c-1.103 0-2 0.897-2 2s0.897 2 2 2 2-0.897 2-2-0.897-2-2-2zM23.5 14.5c-0.551 0-1-0.448-1-1s0.449-1 1-1 1 0.448 1 1-0.449 1-1 1zM9.5 11.595c-1.103 0-2 0.897-2 2s0.897 2 2 2 2-0.897 2-2-0.897-2-2-2zM9.5 14.595c-0.551 0-1-0.448-1-1s0.449-1 1-1 1 0.448 1 1-0.449 1-1 1z"></path>
      </svg>
    </div>
  );
};

export default Logo;
