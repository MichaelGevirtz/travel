import { render, screen, fireEvent } from "@testing-library/react";
import { VideoCard, VideoGrid } from "@/components/videos/VideoCard";
import { travelTipVideos } from "@/lib/constants/videos";
import type { VideoCardData } from "@/types";

const mockVideo: VideoCardData = {
  id: "test123test",
  title: "Test Video Title",
  channelName: "Test Channel",
  description: "Test video description for testing purposes.",
  duration: "10:30",
  category: "tips",
};

describe("VideoCard", () => {
  describe("Rendering", () => {
    it("renders video title", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByText("Test Video Title")).toBeTruthy();
    });

    it("renders channel name", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByText("Test Channel")).toBeTruthy();
    });

    it("renders description", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByText("Test video description for testing purposes.")).toBeTruthy();
    });

    it("renders duration badge", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByText("10:30")).toBeTruthy();
    });

    it("renders category badge", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByText("tips")).toBeTruthy();
    });
  });

  describe("Play Button", () => {
    it("shows play button initially", () => {
      render(<VideoCard {...mockVideo} />);
      expect(screen.getByRole("button", { name: /play test video title/i })).toBeTruthy();
    });

    it("expands to embedded player on click", () => {
      render(<VideoCard {...mockVideo} />);

      const playButton = screen.getByRole("button", { name: /play test video title/i });
      fireEvent.click(playButton);

      expect(screen.getByTitle("Test Video Title")).toBeTruthy();
      expect(screen.getByRole("button", { name: /close video/i })).toBeTruthy();
    });

    it("closes player and returns to thumbnail on close click", () => {
      render(<VideoCard {...mockVideo} />);

      const playButton = screen.getByRole("button", { name: /play test video title/i });
      fireEvent.click(playButton);

      const closeButton = screen.getByRole("button", { name: /close video/i });
      fireEvent.click(closeButton);

      expect(screen.getByRole("button", { name: /play test video title/i })).toBeTruthy();
    });
  });

  describe("Thumbnail", () => {
    it("renders correct YouTube thumbnail URL", () => {
      render(<VideoCard {...mockVideo} />);

      const thumbnail = screen.getByAltText("Test Video Title");
      expect(thumbnail.getAttribute("src")).toBe(
        "https://img.youtube.com/vi/test123test/maxresdefault.jpg"
      );
    });
  });

  describe("Categories", () => {
    it("renders tips category", () => {
      render(<VideoCard {...mockVideo} category="tips" />);
      expect(screen.getByText("tips")).toBeTruthy();
    });

    it("renders guide category", () => {
      render(<VideoCard {...mockVideo} category="guide" />);
      expect(screen.getByText("guide")).toBeTruthy();
    });

    it("renders vlog category", () => {
      render(<VideoCard {...mockVideo} category="vlog" />);
      expect(screen.getByText("vlog")).toBeTruthy();
    });

    it("renders food category", () => {
      render(<VideoCard {...mockVideo} category="food" />);
      expect(screen.getByText("food")).toBeTruthy();
    });
  });

  describe("Semantic HTML", () => {
    it("uses article element for card wrapper", () => {
      const { container } = render(<VideoCard {...mockVideo} />);
      expect(container.querySelector("article")).toBeTruthy();
    });
  });
});

describe("VideoGrid", () => {
  describe("Rendering", () => {
    it("renders all videos in the grid", () => {
      render(<VideoGrid videos={travelTipVideos} />);

      travelTipVideos.forEach((video) => {
        expect(screen.getByText(video.title)).toBeTruthy();
      });
    });

    it("renders custom title", () => {
      render(<VideoGrid videos={[mockVideo]} title="Custom Title" />);
      expect(screen.getByText("Custom Title")).toBeTruthy();
    });

    it("renders custom subtitle", () => {
      render(<VideoGrid videos={[mockVideo]} title="Title" subtitle="Custom subtitle" />);
      expect(screen.getByText("Custom subtitle")).toBeTruthy();
    });

    it("renders default title when not provided", () => {
      render(<VideoGrid videos={[mockVideo]} />);
      expect(screen.getByText("Travel Videos")).toBeTruthy();
    });

    it("renders empty grid when no videos provided", () => {
      render(<VideoGrid videos={[]} title="Empty Grid" />);
      expect(screen.getByText("Empty Grid")).toBeTruthy();
    });
  });
});

describe("Video Data Validation", () => {
  it("all videos have valid YouTube IDs (11 characters)", () => {
    travelTipVideos.forEach((video) => {
      expect(video.id).toMatch(/^[\w-]{11}$/);
    });
  });

  it("all videos have required fields", () => {
    travelTipVideos.forEach((video) => {
      expect(video.id).toBeTruthy();
      expect(video.title).toBeTruthy();
      expect(video.channelName).toBeTruthy();
      expect(video.description).toBeTruthy();
      expect(video.duration).toBeTruthy();
      expect(["tips", "guide", "vlog", "food"]).toContain(video.category);
    });
  });

  it("all videos have valid duration format (MM:SS or H:MM:SS)", () => {
    travelTipVideos.forEach((video) => {
      expect(video.duration).toMatch(/^(\d{1,2}:)?\d{1,2}:\d{2}$/);
    });
  });
});
