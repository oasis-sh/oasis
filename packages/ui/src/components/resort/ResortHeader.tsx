<<<<<<< HEAD
import { Button } from '../common/Button';
import { RightArrow } from '../../index';
import {
  GetResortByNameWithMembersQuery,
  useJoinResortMutation,
} from '@oasis-sh/client-gql';
import React from 'react';
import AvatarGroup from './AvatarGroup';

type dataType = GetResortByNameWithMembersQuery['getResortByName'];

interface IResortHeaderProps {
  resortData: dataType;
}

const ResortHeader: React.FC<IResortHeaderProps> = ({ resortData }) => {
  const [joinMutation] = useJoinResortMutation({
    variables: { resortId: resortData?.id ?? '' },
  });

=======
import { Button } from "../../index";
import { RightArrow } from "../../index";
import { GetResortByNameWithMembersQuery } from "@oasis-sh/client-gql";
import React from "react";
import AvatarGroup from "./AvatarGroup";

type dataType = GetResortByNameWithMembersQuery["getResortByName"];

interface IResortHeaderProps {
  resortData: dataType;
  joinResort: () => any;
}

export const ResortHeader: React.FC<IResortHeaderProps> = ({
  resortData,
  joinResort,
}) => {
>>>>>>> ui-new
  return (
    <div
      className="max-w-7xl rounded-2xl h-48 background-cover flex-grow flex px-16 items-center font-sans"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
<<<<<<< HEAD
          resortData?.banner ?? ''
        })`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
=======
          resortData?.banner ?? ""
        })`,
        backgroundSize: "100%",
        backgroundPosition: "center",
>>>>>>> ui-new
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="uppercase font-mono text-xs font-bold tracking-widest text-gray-500">
<<<<<<< HEAD
            RESORTS /{' '}
=======
            RESORTS /{" "}
>>>>>>> ui-new
            <span className="text-gray-200">
              {resortData?.category.toUpperCase()}
            </span>
          </span>
<<<<<<< HEAD
          <h2 className="font-extrabold">{resortData?.name ?? ''}</h2>
          <p className="text-gray-300 text-lg">
            {resortData?.description ?? ''}
=======
          <h2 className="font-extrabold">{resortData?.name ?? ""}</h2>
          <p className="text-gray-300 text-lg">
            {resortData?.description ?? ""}
>>>>>>> ui-new
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <AvatarGroup
              avatarIcons={
                resortData?.members.items.map((member) => member.avatar) ?? []
              }
            />
            <Button
              className="flex items-center justify-center space-x-1"
              size="xs"
              color="gray"
              onClick={(_) => {
                if (!resortData?.isJoined) {
<<<<<<< HEAD
                  joinMutation();
=======
                  joinResort();
>>>>>>> ui-new
                  window.location.reload();
                }
              }}
            >
              {!resortData?.isJoined ? (
                <>
                  <div className="text-sm">Follow</div>
                  <RightArrow height="1.25rem" width="1.25rem" />
                </>
              ) : (
                <div className="text-sm">Following</div>
              )}
            </Button>
          </div>
        </div>
        <div>
          <img
            className="w-24 h-24 object-cover rounded"
<<<<<<< HEAD
            src={resortData?.logo ?? ''}
=======
            src={resortData?.logo ?? ""}
>>>>>>> ui-new
            alt="resort logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;
