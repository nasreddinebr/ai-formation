"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError, type CourseProgress } from "@/lib/api/client";

function formatDate(value: string): string {
  const date = new Date(value.endsWith("Z") ? value : `${value}Z`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function StartedCourses() {
  const [courses, setCourses] = useState<CourseProgress[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const dashboard = await api.dashboard();
      setCourses(dashboard.courses);
      setError(null);
    } catch (err) {
      setCourses([]);
      setError(err instanceof ApiError ? err.message : "Chargement impossible.");
    }
  }, []);

  useEffect(() => {
    let active = true;
    api.dashboard().then(
      (dashboard) => {
        if (!active) return;
        setCourses(dashboard.courses);
        setError(null);
      },
      (err: unknown) => {
        if (!active) return;
        setCourses([]);
        setError(err instanceof ApiError ? err.message : "Chargement impossible.");
      },
    );
    return () => {
      active = false;
    };
  }, []);

  async function handleRemove(courseId: number) {
    setCourses((prev) => prev?.filter((course) => course.course_id !== courseId) ?? prev);
    try {
      await api.removeCourse(courseId);
    } catch {
      void load();
    }
  }

  return (
    <div className="rounded-2xl border border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">
        Cours commencés
      </h2>
      <p className="mt-1 text-sm text-ink2">
        Reprenez chaque cours là où vous vous êtes arrêté.
      </p>

      {courses === null ? (
        <div className="mt-4 space-y-2" aria-hidden="true">
          {[0, 1].map((row) => (
            <div key={row} className="h-14 animate-pulse rounded-xl bg-paper2" />
          ))}
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : courses.length === 0 ? (
        <p className="mt-4 text-sm text-ink2">
          Aucun cours commencé pour le moment.{" "}
          <Link href="/#modules" className="text-route-deep underline-offset-2 hover:underline">
            Explorer les modules
          </Link>
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {courses.map((course) => (
            <li
              key={course.course_id}
              className="flex items-center gap-3 rounded-xl border border-hair p-3 transition-colors hover:border-route"
            >
              <Link href={course.chapter_url} className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{course.course_title}</p>
                <p className="truncate font-mono text-xs text-ink2">
                  {course.chapter_title}
                  {course.last_visited_at ? ` · ${formatDate(course.last_visited_at)}` : ""}
                </p>
              </Link>
              <Link
                href={course.chapter_url}
                className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper transition-colors hover:bg-route"
              >
                Reprendre
              </Link>
              <button
                onClick={() => handleRemove(course.course_id)}
                className="text-xs text-ink2 transition-colors hover:text-ink"
                aria-label={`Retirer ${course.course_title} du tableau de bord`}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
